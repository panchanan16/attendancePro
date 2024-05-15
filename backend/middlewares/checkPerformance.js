const { performance, PerformanceObserver } = require('perf_hooks');

function cpuProfilerMiddleware(req, res, next) {
    const startCPUUsage = process.cpuUsage();
    const startTime = performance.now();

    const obs = new PerformanceObserver((items) => {
        items.getEntries().forEach(entry => {
            // console.log(`[Performance] ${entry.name}: ${entry.duration}ms`);
            console.log(entry)
        });
    });
    obs.observe({ entryTypes: ['measure'] });

    performance.mark("start")

    next();

    // Measure CPU usage and time after request processing
    const endCPUUsage = process.cpuUsage(startCPUUsage);
    const endTime = performance.now();

    const cpuUsageMicroSeconds = endCPUUsage.user + endCPUUsage.system;
    console.log(`[CPU Usage] ${cpuUsageMicroSeconds}µs`);

    const elapsedTime = endTime - startTime;
    console.log(`[Elapsed Time] ${elapsedTime}ms`);

    performance.mark('end');
    performance.measure('request', 'start', 'end');
}


module.exports = cpuProfilerMiddleware;





