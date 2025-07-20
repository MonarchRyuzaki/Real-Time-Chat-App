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
./run-incremental-tests.sh "phase_name"
```

### Examples

```bash
# Test chat performance
./run-incremental-tests.sh "chat_performance"

# Test after optimization
./run-incremental-tests.sh "after_optimization"

# Test specific feature
./run-incremental-tests.sh "group_chat_feature"
```

## Test Phases

The script runs 5 progressive test phases:

1. **Light Load**: 10 users max, 30 seconds, 5 arrival rate
2. **Medium Load**: 25 users max, 60 seconds, 10 arrival rate  
3. **Heavy Load**: 50 users max, 90 seconds, 20 arrival rate
4. **Stress Test**: 100 users max, 120 seconds, 40 arrival rate
5. **Peak Load**: 200 users max, 150 seconds, 80 arrival rate

Each test waits 30 seconds between phases to let your system recover.

## Results

Results are saved in the `results/` folder with the following naming convention:
```
{phase_name}_{test_level}_{max_users}users_{timestamp}.json
{phase_name}_{test_level}_{max_users}users_{timestamp}.html
```

Example:
- `chat_performance_light_10users_20250720_143025.json`
- `chat_performance_light_10users_20250720_143025.html`

## Monitoring

- The script will stop if any test fails
- HTML reports are automatically generated for visual analysis
- Each test shows real-time progress and results
- System recovery time is built in between tests

## Safety Features

- Progressive load increase prevents system crashes
- Automatic cleanup of temporary files
- Error handling and graceful failure
- System recovery time between tests