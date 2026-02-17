import { expect, test } from "bun:test";

const cities = ["ahmedabad", "paris", "lucknow", "pune"];

test("API testing", 
    async () => {
        let i = Math.floor((Math.random()*10)/4);
        // console.log(cities[i]);
        const res = await fetch(`http://localhost:3000/currweather?city=${cities[i]}`);
        expect(res.status).toBe(200);
    },
    { repeats: 200000 }
)