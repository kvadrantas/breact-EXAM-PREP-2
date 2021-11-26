import moment from "moment-timezone";

function fixDate(data) {
    return data.map((e, i) =>  {
        return({
            id: e.id,
            name: e.name,
            weight: e.weight,
            total_milk: e.total_milk,
            last_milking_time: moment.tz(e.last_milking_time, "Europe/Vilnius").format('YYYY-MM-DD'),
        })
    })
}

export default fixDate;