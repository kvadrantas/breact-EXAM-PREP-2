function Sort(itemss, by, setFilterBy) {
    let items = itemss.slice();
    switch (by) {
        case 'in-stock':
            setFilterBy('1');
            // items = items.filter(e => e.instock === 1);
            break;
        case 'out-stock':
            setFilterBy('0');
            // items = items.filter(e => e.instock === 0);
            break;
        case 'number-asc':
            setFilterBy('ASC');
            // items.sort(function(a, b) {
            //     return a.price - b.price;
            // });
            break;
        case 'number-desc':
            setFilterBy('DESC');
            // items.sort(function(a, b) {
            //     return b.price - a.price;
            // });
            break;
        default:
    }
    return items
}
export default Sort;