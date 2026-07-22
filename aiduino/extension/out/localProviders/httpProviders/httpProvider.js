/*
 * AI.duino - HTTP Provider Utilities
 * Copyright 2025 Monster Maker
 * 
 * Licensed under the Apache License, Version 2.0
 * 
 * Shared utilities for HTTP-based local providers (Ollama, LM Studio, etc.)
 */

const http = require('http');

/**
 * Detect best available model from HTTP provider
 * @param {string} baseUrl - Provider base URL
 * @param {string} endpoint - Endpoint to fetch models (e.g., '/api/tags', '/v1/models')
 * @param {number} defaultPort - Default port if not in URL
 * @param {Array} preferredModels - List of preferred model patterns
 * @param {Function} extractModels - Function to extract model list from response
 * @returns {Promise<string|null>} Best available model name or null
 */
async function detectBestModel(baseUrl, endpoint, defaultPort, preferredModels, extractModels) {
    return new Promise((resolve) => {
        const parsedBaseUrl = new URL(baseUrl);
        
        // Build path: If baseUrl already contains a path (e.g., /v1), merge it with endpoint
        let path = endpoint;
        if (parsedBaseUrl.pathname && parsedBaseUrl.pathname !== '/') {
            const basePath = parsedBaseUrl.pathname.replace(/\/$/, '');
            // If baseUrl already has /v1, remove it from endpoint to avoid duplication
            const endpointPath = endpoint.replace(/^\/v1/, '');
            path = basePath + endpointPath;
        }
        
        const req = http.get({
            hostname: parsedBaseUrl.hostname,
            port: parsedBaseUrl.port || defaultPort,
            path: path,
            timeout: 5000
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    const models = extractModels(response);
                    
                    // Try preferred models first
                    for (const pref of preferredModels) {
                        const found = models.find(model => 
                            model.toLowerCase().includes(pref.toLowerCase())
                        );
                        if (found) return resolve(found);
                    }
                    
                    // Return first available model
                    resolve(models[0] || null);
                } catch {
                    resolve(null);
                }
            });
        });
        
        req.on('error', () => resolve(null));
        req.on('timeout', () => {
            req.destroy();
            resolve(null);
        });
    });
}

/**
 * Test HTTP provider connection
 * @param {string} url - URL to test
 * @param {number} defaultPort - Default port if not in URL
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<boolean>} True if accessible
 */
async function testConnection(url, defaultPort = 80, timeout = 3000) {
    return new Promise((resolve) => {
        const testUrl = new URL(url);
        
        // Use the path from the URL if provided, otherwise default to '/'
        const path = testUrl.pathname && testUrl.pathname !== '/' ? testUrl.pathname : '/';
        
        const req = http.get({
            hostname: testUrl.hostname,
            port: testUrl.port || defaultPort,
            path: path,
            timeout: timeout
        }, (res) => {
            resolve(res.statusCode === 200 || res.statusCode === 404); // 404 is ok, means server is running
        });
        
        req.on('error', () => resolve(false));
        req.on('timeout', () => {
            req.destroy();
            resolve(false);
        });
    });
}

module.exports = {
    detectBestModel,
    testConnection
};
