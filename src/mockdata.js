const mockData = {
    lists: {
        "01list": {
            id: "01list",
            title: "To do",
            cards: [{
                id: "01card",
                title: "task number1"
            },{
                id: "02card",
                title: "task number2"
            },{
                id: "03card",
                title: "task number3"
            }]
        },
        "02list": {
            id: "02list",
            title: "In progress",
            cards: []

        }
    },
    listIds: ["01list", "02list"]
}

export default mockData;