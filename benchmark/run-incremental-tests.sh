#!/bin/bash

# Incremental Artillery Load Testing Script
# Usage: ./run-incremental-tests.sh <phase_name> [start_from_test] [--auto]
# Example: ./run-incremental-tests.sh "chat_performance"
# Start from specific test: ./run-incremental-tests.sh "chat_performance" "05_stress"
# Automatic mode (no prompts): ./run-incremental-tests.sh "chat_performance" "" --auto

if [ $# -eq 0 ]; then
    echo "Usage: $0 <phase_name> [start_from_test] [--auto]"
    echo "Example: $0 'chat_performance'"
    echo "Start from specific test: $0 'chat_performance' '05_stress'"
    echo "Automatic mode (no prompts): $0 'chat_performance' '' --auto"
    exit 1
fi

PHASE_NAME="$1"
START_FROM="${2:-}"
AUTO_MODE=false

# Check for --auto flag in any position
for arg in "$@"; do
    if [ "$arg" = "--auto" ]; then
        AUTO_MODE=true
        break
    fi
done

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
RESULTS_DIR="./results"
PHASE_DIR="$RESULTS_DIR/$PHASE_NAME"
LOG_FILE="$PHASE_DIR/test_execution_${TIMESTAMP}.log"

# Create results directory structure if it doesn't exist
mkdir -p "$PHASE_DIR"

# Initialize log file
echo "=== Load Testing Session Started ===" > "$LOG_FILE"
echo "Phase: $PHASE_NAME" >> "$LOG_FILE"
echo "Timestamp: $TIMESTAMP" >> "$LOG_FILE"
echo "Start from: ${START_FROM:-'beginning'}" >> "$LOG_FILE"
echo "Auto Mode: $AUTO_MODE" >> "$LOG_FILE"
echo "======================================" >> "$LOG_FILE"

# Function to log messages
log_message() {
    local message="$1"
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $message" | tee -a "$LOG_FILE"
}

# Function to check if server is responding
check_server_health() {
    log_message "🔍 Checking server health at ws://localhost:4000"
    
    # Use curl to check if the server is accessible (HTTP check)
    if curl -s --connect-timeout 5 http://localhost:4000 >/dev/null 2>&1; then
        log_message "✅ Server is responding to HTTP requests"
        return 0
    else
        log_message "❌ Server is not responding to HTTP requests"
        return 1
    fi
}

# Function to prompt user for continuation
prompt_continue() {
    local test_level="$1"
    
    # Skip prompt if in automatic mode
    if [ "$AUTO_MODE" = true ]; then
        log_message "🤖 Auto mode: Continuing with $test_level test"
        return 0
    fi
    
    echo ""
    echo "🎯 Next test: $test_level"
    read -p "Do you want to continue with this test? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        return 0
    else
        return 1
    fi
}

# Define test configurations
declare -a TEST_CONFIGS=(
    "01_baseline:5:20:2"         # baseline: 5 users, 20 seconds, 2 arrival rate
    "02_light:10:30:5"           # light load: 10 users, 30 seconds, 5 arrival rate
    "03_medium:25:60:10"         # medium load: 25 users, 60 seconds, 10 arrival rate
    "04_heavy:50:90:20"          # heavy load: 50 users, 90 seconds, 20 arrival rate
    "05_stress:100:120:40"       # stress test: 100 users, 120 seconds, 40 arrival rate
    "06_peak:200:150:80"         # peak load: 200 users, 150 seconds, 80 arrival rate
    "07_extreme:400:180:120"     # extreme load: 400 users, 180 seconds, 120 arrival rate
    "08_overload:600:210:180"    # overload test: 600 users, 210 seconds, 180 arrival rate
    "09_breaking:800:240:250"    # breaking point: 800 users, 240 seconds, 250 arrival rate
    # "10_chaos:1000:300:400"      # chaos test: 1000 users, 300 seconds, 400 arrival rate
    # "11_nuclear:1500:360:600"    # nuclear test: 1500 users, 360 seconds, 600 arrival rate
)

# Initial server health check
if ! check_server_health; then
    log_message "💥 Server is not responding! Please start your WebSocket server on ws://localhost:4000"
    exit 1
fi

log_message "🚀 Starting incremental load testing for phase: $PHASE_NAME"
log_message "📁 Results will be saved in: $PHASE_DIR"
log_message "=========================================="

# Track which tests completed successfully
declare -a COMPLETED_TESTS=()
declare -a FAILED_TESTS=()

# Determine starting point
start_index=0
if [ -n "$START_FROM" ]; then
    log_message "🔄 Starting from test: $START_FROM"
    for i in "${!TEST_CONFIGS[@]}"; do
        IFS=':' read -r test_level _ _ _ <<< "${TEST_CONFIGS[$i]}"
        if [ "$test_level" = "$START_FROM" ]; then
            start_index=$i
            log_message "✅ Found start point at index $i ($test_level)"
            break
        fi
    done
fi

for ((i=start_index; i<${#TEST_CONFIGS[@]}; i++)); do
    config="${TEST_CONFIGS[$i]}"
    IFS=':' read -r test_level max_users duration arrival_rate <<< "$config"
    
    # Prompt user for continuation (except for first test)
    if [ $i -gt $start_index ]; then
        if ! prompt_continue "$test_level"; then
            log_message "🛑 User chose to stop at $test_level"
            break
        fi
    fi
    
    log_message ""
    log_message "🔄 Starting $test_level test... (${i+1}/${#TEST_CONFIGS[@]})"
    log_message "   📊 Max Users: $max_users, Duration: ${duration}s, Arrival Rate: $arrival_rate"
    
    # Pre-test health check
    if ! check_server_health; then
        log_message "💥 Server health check failed before $test_level test!"
        FAILED_TESTS+=("$test_level (pre-test server failure)")
        break
    fi
    
    # Create temporary artillery config for this test
    temp_config="artillery-temp-${test_level}.yaml"
    
    cat > "$temp_config" << EOF
config:
  target: 'ws://localhost:4000'
  processor: './artillery-processor.ts'
  phases:
    - duration: $duration
      arrivalRate: $arrival_rate
      rampTo: $max_users
      name: '${test_level} Load Phase'
scenarios:
  - name: 'One To One Chat'
    engine: ws
    weight: 100
    flow:
      - connect: 
          function: 'connectHandler'
      - function: 'postConnectionHandler'
      - function: 'handleOneToOne'
      - loop:
        - function: 'preMessageSend'
        - send:
            type: 'ONE_TO_ONE_CHAT'
            from: '{{ username }}'
            to: '{{ targetFriend }}'
            content: 'Hello, this is a test message!'
        - function: 'postMessageSend'
        count: 10
      - think: 1
      - send:
          type: 'DISCONNECT'
#   - name: 'Group Chat'
    # engine: ws
    # weight: 0
    # flow:
    #   - connect: 
    #       function: 'connectHandler'
    #   - function: 'postConnectionHandler'
    #   - function: 'handleGroups'
    #   - loop:
    #     - function: 'preMessageSend'
    #     - send:
    #         type: 'GROUP_CHAT'
    #         from: '{{ username }}'
    #         to: '{{ groupId }}'
    #         content: 'Hello, this is a test message!'
    #     - function: 'postMessageSend'
    #     count: 10
    #   - think: 1
    #   - send:
    #       type: 'DISCONNECT'
EOF

    # Generate result filename in phase directory
    result_file="${PHASE_DIR}/${test_level}_${max_users}users_${TIMESTAMP}.json"
    
    log_message "🎯 Executing artillery test..."
    log_message "📝 Command: artillery run $temp_config --output $result_file"
    
    # Run the artillery test
    if artillery run "$temp_config" --output "$result_file" 2>&1 | tee -a "$LOG_FILE"; then
        log_message "✅ $test_level test execution completed"
        COMPLETED_TESTS+=("$test_level")
        
        # Generate HTML report
        html_report="${result_file%.json}.html"
        if artillery report "$result_file" --output "$html_report" 2>&1 | tee -a "$LOG_FILE"; then
            log_message "📋 HTML report generated: $html_report"
        else
            log_message "⚠️  HTML report generation failed for $test_level"
        fi
        
        # Brief pause between tests
        if [ "$test_level" != "11_nuclear" ]; then
            log_message "⏳ Waiting 10 seconds before next test..."
            sleep 10
        fi
    else
        log_message "💥 $test_level test execution failed"
        FAILED_TESTS+=("$test_level (execution failure)")
        log_message "🛑 Test failed at: $max_users users with $arrival_rate arrival rate"
        break
    fi
    
    # Clean up temporary config
    rm -f "$temp_config"
done

# Final summary
log_message ""
log_message "=========================================="
log_message "🏁 Load testing completed for phase: $PHASE_NAME"
log_message "📁 All results saved in: $PHASE_DIR"
log_message "📋 Detailed log saved in: $LOG_FILE"
log_message ""
log_message "📊 Test Summary:"
log_message "✅ Completed tests (${#COMPLETED_TESTS[@]}): ${COMPLETED_TESTS[*]}"
if [ ${#FAILED_TESTS[@]} -gt 0 ]; then
    log_message "❌ Failed tests (${#FAILED_TESTS[@]}): ${FAILED_TESTS[*]}"
fi

# Clean up any remaining temp files
rm -f artillery-temp-*.yaml

# Final health check
check_server_health