function Statistics ({stats}) {

    return(
        <>
            <div className="statistics">
                <fieldset className="sub-statistics">
                    <legend>General Statistics</legend>
                    <div>
                            <span><p>Total animal: <i>{stats.totalAnimal}</i></p></span>
                            <span><p>Total milk <i>{parseFloat(stats.totalMilk).toFixed(0)}</i></p></span>
                    </div>

                </fieldset>
            </div>
            <div className="gradient-bar"></div>
        </>
    )

}

export default Statistics;