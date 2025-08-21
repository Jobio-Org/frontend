import type { NextConfig } from "next";

import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    // webpack: (config, _context) => {
    //     config.watchOptions = {
    //         poll: 5000,
    //         aggregateTimeout: 1000,
    //         ignored: /node_modules/
    //     };
    // },
    experimental: {
        turbo: {}
    },
    transpilePackages: ["@jobio-org/api-client"]
};

// eslint-disable-next-line
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true"
});

const withNextIntl = createNextIntlPlugin("src/app/i18n/request.ts");
export default withNextIntl(withBundleAnalyzer(nextConfig));
