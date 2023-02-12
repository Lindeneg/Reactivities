module.exports = {
    trailingComma: 'es5',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    useTabs: false,
    printWidth: 120,
    jsxSingleQuote: true,
    importOrder: ['<THIRD_PARTY_MODULES>', '^[@/]'],
    importOrderSortSpecifiers: true,
    plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
};
