/* eslint-disable no-const-assign */
export default function Details() {

    const detils = [
        {
            name: "shradha",
            lastname: "kachhdiya",
            data: [
                {
                    GrId: 11,
                    coures: "desing"
                },
                {
                    GrId: 12,
                    coures: "full stack",
                    students: [

                        {
                            name: "kinal",
                            date: "12-04-2023",
                        },
                        {
                            name: "jinal",
                            date: "15-04-2023",
                        }, {
                            name: "vaishnvi",
                            date: "5-04-2023",
                        }
                    ]
                },
                {
                    GrId: 13,
                    coures: "fultter"
                }
            ]

        },
        {
            name: "jiyu",
            lastname: "patel",
        },
        {
            name: "dish",
            lastname: "danani"
        },
        {
            name: "prit",
            lastname: "dhorajiya"
        },

    ]

    const find = (name) => {
        let i = 0
        while (i < detils.length) {
            if (detils[i].name === name) {

                return (detils[i]);
                // let j = 0
                // let m = detils[i].data
                // while (j < m.length) {
                //     if (detils[i].data[j].students[1] === name) {
                //         // console.log(object);
                //     }

                    
                // }
            }
            // if (detils[i].data.students[i].name = "kinal") {
            //     return (detils[i].data.students[i].name)
            // }

            // console.log(detils[i].data[1].students[1]);
            i++

        }
    }
    console.log(find("shradha"));



    return (
        <>
        </>
    )
}

