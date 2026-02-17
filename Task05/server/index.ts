// console.log("Hello via Bun!");

// importing bun:sqlite db driver
import { Database, type SQLQueryBindings } from "bun:sqlite";

// type definition for cache data return
interface CacheData {
  UPDATED_AT: number;
  WEATHER_DATA: string;
}

interface MyResponse extends Response {
  status: number;
  data: {};
}

// init constants
const db = new Database("weather.sqlite");
const PORT: number = 3000;

const TTL = 60 * 1000;

const WEATHER_API: string = "http://api.weatherapi.com/v1/current.json";
const WEATHER_API_KEY: string = "61e2175330454248aef115443261602";

// table creation query
db.run(`CREATE TABLE IF NOT EXISTS WEATHER (
    CITY TEXT PRIMARY KEY,
    WEATHER_DATA TEXT NOT NULL,
    UPDATED_AT INTEGER NOT NULL
  )`);

// setting up a server with Bun.serve
Bun.serve({
  routes: {
    "/currweather": async (req: Request): Promise<Response> => {
      const url = new URL(req.url);
      let data: {};
      let city: string | null = url.searchParams.get("city");

      if (city) {
        data = await getCurrentWeather(city);
        return Response.json(
          {
            message: "all ok",
            ...data,
          },
          {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            },
          },
        );
      } else {
        return Response.json(
          {
            message: "error",
          },
          {
            status: 400,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            },
          },
        );
      }
    },
  },
  port: PORT,
});

async function getCurrentWeather(city: string): Promise<{}> {
  const now: number = Date.now();
  const cached: CacheData = fetchCachedData(city);
  let isFresh = false;

  if (cached) isFresh = now - cached.UPDATED_AT < TTL;

  if (isFresh) {
    // console.log("cache hit");
    return JSON.parse(cached.WEATHER_DATA);
  } else {
    let data = await fetchDataFromAPI(city);
    updateCacheData(city, data, now);

    return data;
  }
}

const fetchCachedData = (city: string): CacheData => {
  let def: CacheData = {
    WEATHER_DATA: "",
    UPDATED_AT: -1,
  };
  let cached: CacheData | null;
  try {
    cached = db
      .query<
        CacheData,
        SQLQueryBindings
      >("SELECT WEATHER_DATA, UPDATED_AT FROM WEATHER WHERE CITY = ?")
      .get(city);
    return cached ?? def;
  } catch (err: Error | any) {
    console.error(err.message);
    return def;
  }
};

const updateCacheData = (city: string, data: {}, now: number) => {
  db.query(
    `
    INSERT INTO WEATHER (CITY, WEATHER_DATA, UPDATED_AT)
    VALUES (?, ?, ?)
    ON CONFLICT(CITY) DO UPDATE SET
      WEATHER_DATA = excluded.WEATHER_DATA,
      UPDATED_AT = excluded.UPDATED_AT
  `,
  ).run(city, JSON.stringify(data), now);
};

// fetch weather data from FreeWeatherAPI
const fetchDataFromAPI = async (city: string) => {
  let apiData = {};

  const params = {
    key: WEATHER_API_KEY,
    q: city,
  };

  let querystr: string = new URLSearchParams(params).toString();

  try {
    apiData = (await fetch(`${WEATHER_API}?${querystr}`)).json();
  } catch (err: Error | any) {
    console.error(err.message);
  }
  return apiData;
};
