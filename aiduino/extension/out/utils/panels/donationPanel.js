/*
 * AI.duino - Donation Panel Module
 * Copyright 2026 Monster Maker
 * 
 * Licensed under the Apache License, Version 2.0
 */

const vscode = require('vscode');
const panelManager = require('../panelManager');

/**
 * Show Donation panel with Ifdian page embedded
 */
function showDonation() {
    const panel = panelManager.getOrCreatePanel({
        id: 'aiduinoDonation',
        title: '捐赠支持',
        viewColumn: vscode.ViewColumn.One,
        webviewOptions: {
            enableScripts: true,
            enableForms: true,
            enableCommandUris: true,
            retainContextWhenHidden: true
        }
    });
    
    // If panel was just revealed, return early
    if (panel.webview.html) {
        return;
    }
    
    panel.webview.html = generateDonationHTML();
}

/**
 * Generate HTML for Donation panel
 */
function generateDonationHTML() {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        html, body {
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: #ffffff;
        }
        .donation-container {
            width: 100%;
            height: 100%;
            position: relative;
        }
        iframe {
            width: 100%;
            height: 100%;
            border: none;
            display: block;
        }
        .loading-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 100;
        }
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #f3f3f3;
            border-top-color: #e74c3c;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 16px;
        }
        .loading-text {
            color: #666666;
            font-size: 14px;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="donation-container">
        <div class="loading-overlay" id="loading">
            <div class="loading-spinner"></div>
            <div class="loading-text">正在加载捐赠页面...</div>
        </div>
        <iframe src="https://ifdian.net/a/an-xi" 
                sandbox="allow-scripts allow-forms allow-popups allow-top-navigation allow-same-origin"
                onload="document.getElementById('loading').style.display = 'none';"></iframe>
    </div>
</body>
</html>`;
}

module.exports = { showDonation };