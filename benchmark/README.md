# Incremental Artillery Load Testing

This directory contains scripts for running incremental load tests on your WebSocket chat application to prevent system crashes.

## Files

- `run-incremental-tests.sh` - Main script that runs progressive load tests
- `artillery.yaml` - Original artillery configuration (high load - use with caution)
- `artillery-processor.ts` - Artillery processor functions for handling connections and messages

## Usage

1. Make sure your WebSocket server is running on `ws://localhost:4000`
2. Run the incremental test script:

```bash
./run-incremental-tests.sh "phase_name" [start_from_test] [--auto]
```

### Examples

```bash
# Interactive mode (default) - prompts before each test
./run-incremental-tests.sh "chat_performance"

# Automatic mode - runs all tests without prompts
./run-incremental-tests.sh "chat_performance" "" --auto

# Start from specific test (interactive)
./run-incremental-tests.sh "after_optimization" "05_stress"

# Start from specific test (automatic)
./run-incremental-tests.sh "after_optimization" "05_stress" --auto

# Test specific feature automatically
./run-incremental-tests.sh "group_chat_feature" "" --auto
```

## Test Modes

### Interactive Mode (Default)
- Prompts you before each test phase
- Allows you to stop at any point
- Good for development and testing individual phases
- Use when you want manual control

### Automatic Mode (--auto flag)
- Runs all tests continuously without prompts
- Stops only if a test fails or server becomes unresponsive
- Perfect for CI/CD pipelines or unattended testing
- Use for complete load testing sessions

## Test Phases

The script runs 9 progressive test phases:

1. **Baseline**: 5 users max, 20 seconds, 2 arrival rate
2. **Light Load**: 10 users max, 30 seconds, 5 arrival rate
3. **Medium Load**: 25 users max, 60 seconds, 10 arrival rate  
4. **Heavy Load**: 50 users max, 90 seconds, 20 arrival rate
5. **Stress Test**: 100 users max, 120 seconds, 40 arrival rate
6. **Peak Load**: 200 users max, 150 seconds, 80 arrival rate
7. **Extreme Load**: 400 users max, 180 seconds, 120 arrival rate
8. **Overload Test**: 600 users max, 210 seconds, 180 arrival rate
9. **Breaking Point**: 800 users max, 240 seconds, 250 arrival rate

Each test waits 10 seconds between phases to let your system recover.

## Results

Results are saved in the `results/{phase_name}/` folder with the following naming convention:
```
{test_level}_{max_users}users_{timestamp}.json
{test_level}_{max_users}users_{timestamp}.html
```

Example:
- `01_baseline_5users_20250720_143025.json`
- `01_baseline_5users_20250720_143025.html`

## Monitoring

- The script will stop if any test fails
- HTML reports are automatically generated for visual analysis
- Each test shows real-time progress and results
- System recovery time is built in between tests
- Detailed execution log is saved for each session

## Safety Features

- Progressive load increase prevents system crashes
- Automatic cleanup of temporary files
- Error handling and graceful failure
- System recovery time between tests
- Server health checks before each test
- Option to start from any specific test phase

## Advanced Usage

### Starting from a Specific Test
If a previous run failed or you want to test only higher loads:

```bash
# Start from stress test onwards
./run-incremental-tests.sh "optimization_test" "05_stress"
```

### CI/CD Integration
For automated testing in pipelines:

```bash
# Run complete test suite automatically
./run-incremental-tests.sh "ci_build_$BUILD_NUMBER" "" --auto
```

### Monitoring Server Performance
- Watch your server logs while tests run
- Monitor CPU, memory, and connection counts
- Check WebSocket connection stability
- Use the generated HTML reports for detailed analysis