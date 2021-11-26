function Nav({ filterBy, setFilterBy, reset, searchBy, setSearchBy, sortConditions, handleSort, types}) {

// ----------------- FILTER -----------------
    const selectFilter = e => {
        setFilterBy(e.target.value)
    }


// ----------------- SORT -----------------
    const selectSort = e => {
        sortConditions.current = e.target.value;
        handleSort(e.target.value);
    }

// ----------------- SEARCH -----------------
    const handleSearchValue = e => {
        if(!e.target.value) reset();
        setSearchBy(e.target.value)
    }

// ----------------- RESET -----------------
    const resetHandler = () => {
        reset();
        setFilterBy('');
        setSearchBy('');
        sortConditions.current = '';
        handleSort('');
    }

    return (
        <div className="main-nav">
            <fieldset>
                <fieldset>
                    <legend>Filter</legend>
                    <div className="filter">
                        <label>By weight</label><br></br>
                        <select onChange={selectFilter} value={filterBy} >
                            <option value="default" hidden>Select weight...</option>
                            <option value="100">above 100 kg</option>
                            <option value="200">above 200 kg</option>
                            <option value="300">above 300 kg</option> 
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Sorting</legend>
                    <div className="sort">
                        <label>Select sort criteria</label><br></br>
                            <button onClick={selectSort} value="number-asc,weight">weight &#8593;</button>
                            <button onClick={selectSort} value="number-desc,weight">weight &#8595;</button>
                            <button onClick={selectSort} value="number-asc,total_milk">total milk &#8593;</button>
                            <button onClick={selectSort} value="number-desc,total_milk">total milk &#8595;</button>
                    </div>
                </fieldset>
                <button className="form-button" onClick={resetHandler}>Reset</button>
            </fieldset>
            <fieldset>
                <legend>Search</legend>
                <div className="search">
                    <label>Type search text</label>
                    <input onChange={handleSearchValue} value={searchBy}></input>
                </div>
            </fieldset>
        </div>
    )
}

export default Nav;