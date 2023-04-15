// noinspection JSUnusedLocalSymbols
module.exports = function override(config, env) {
    // ignore source map warning from CRA5 https://github.com/facebook/create-react-app/pull/11752
    config.ignoreWarnings = [/Failed to parse source map/]
    return config
}
