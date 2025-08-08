// // 'use client';

// import { AreaChart, Card } from "@tremor/react";

// const data = [
//   {
//     year: "2011",
//     "Vehicle Ownership": 2221500,
//     "Population": 3500249,
//   },
//   {
//     year: "2012",
//     "Vehicle Ownership": 2250120,
//     "Population": 3520000,
//   },
//   {
//     year: "2013",
//     "Vehicle Ownership": 2278900,
//     "Population": 3540000,
//   },
//   {
//     year: "2014",
//     "Vehicle Ownership": 2304500,
//     "Population": 3560000,
//   },
//   {
//     year: "2015",
//     "Vehicle Ownership": 2331200,
//     "Population": 3580000,
//   },
//   {
//     year: "2016",
//     "Vehicle Ownership": 2357800,
//     "Population": 3600000,
//   },
//   {
//     year: "2017",
//     "Vehicle Ownership": 2384500,
//     "Population": 3620000,
//   },
//   {
//     year: "2018",
//     "Vehicle Ownership": 2411200,
//     "Population": 3640000,
//   },
//   {
//     year: "2019",
//     "Vehicle Ownership": 2437800,
//     "Population": 3660000,
//   },
//   {
//     year: "2020",
//     "Vehicle Ownership": 2464500,
//     "Population": 3680000,
//   },
//   {
//     year: "2021",
//     "Vehicle Ownership": 2491200,
//     "Population": 3700000,
//   },
//   {
//     year: "2022",
//     "Vehicle Ownership": 2517800,
//     "Population": 3720000,
//   },
// ];

// const valueFormatter = (number) =>
//   `${Intl.NumberFormat("us").format(number).toString()}`;

// export default function Example() {
//   return (
//     <>
//       <Card className="w-full p-0 mb-6 overflow-x-auto">
//         <div className="p-6">
//           <h3 className="font-medium font-semibold text-gray-800">
//             Vehicle Ownership Number
//           </h3>
//           <p className="text-tremor-default leading-6 text-gray-800">
//             This chart shows the number of vehicle ownership requests over the
//             past years.
//           </p>
//         </div>
//         <div className="border-t border-tremor-border p-2 text-sm sm:text-base lg:text-lg">
//           <ul
//             role="list"
//             className="flex flex-wrap items-center gap-x-10 gap-y-4 pl-4 pr-6 text-gray-800"
//           >
//             <li>
//               <div className="flex items-center space-x-2">
//                 <span
//                   className="size-3 shrink-0 rounded-sm bg-blue-500"
//                   aria-hidden={true}
//                 />
//                 <p className="font-semibold text-gray-800">260,526</p>
//               </div>
//               <p className="text-tremor-default text-gray-800">
//                 Vehicle ownership
//               </p>
//             </li>
//             <li>
//               <div className="flex items-center space-x-2">
//                 <span
//                   className="size-3 shrink-0 rounded-sm bg-gray-500"
//                   aria-hidden={true}
//                 />
//                 <p className="font-semibold text-gray-800">3700000</p>
//               </div>
//               <p className="text-tremor-default text-gray-800">Population</p>
//             </li>
//           </ul>
//           <AreaChart
//             data={data}
//             index="year"
//             type="stacked"
//             colors={["blue", "gray"]}
//             categories={["Vehicle Ownership", "Population"]}
//             showLegend={false}
//             showGradient={true}
//             yAxisWidth={150}
//             valueFormatter={valueFormatter}
//             className="mt-10 h-72 sm:block"
//           />
//           <legend className="mt-4 flex items-center justify-between">
//             <span className="text-sm text-gray-600">
//               Vehicle Ownership vs Population
//             </span>
//             <span className="text-sm text-gray-600">
//               Data from 2011 to 2022
//             </span>
//           </legend>
//         </div>
//       </Card>
//     </>
//   );
// }
import {
  AreaChart,
  Card,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Legend,
} from "@tremor/react";

const data = [
  { year: "2011", "Vehicle Ownership": 200000, Population: 3000000 },
  { year: "2012", "Vehicle Ownership": 500000, Population: 3200000 },
  { year: "2013", "Vehicle Ownership": 800000, Population: 3400000 },
  { year: "2014", "Vehicle Ownership": 1000000, Population: 3600000 },
  { year: "2015", "Vehicle Ownership": 1400000, Population: 3800000 },
  { year: "2016", "Vehicle Ownership": 1600000, Population: 4000000 },
  { year: "2017", "Vehicle Ownership": 2000000, Population: 4200000 },
  { year: "2018", "Vehicle Ownership": 2300000, Population: 4400000 },
  { year: "2019", "Vehicle Ownership": 2600000, Population: 4600000 },
  { year: "2020", "Vehicle Ownership": 2800000, Population: 4700000 },
  { year: "2021", "Vehicle Ownership": 3000000, Population: 4800000 },
  { year: "2022", "Vehicle Ownership": 3200000, Population: 4900000 },
];

const summary = [
  { name: "Vehicle Ownership", value: "3.2M vehicles" },
  { name: "Population", value: "4.9M people" },
];

const valueFormatter = (number) => {
  if (number >= 1000000) return `${number / 1000000}M`;
  if (number >= 1000) return `${number / 1000}K`;
  return number;
};

export default function VehicleChartTabs() {
  return (
    <>
      <h3 className="text-black text-tremor-title font-semibold">
        Vehicle Ownership vs Population
      </h3>
      <p className="mt-1 text-black text-tremor-default">
        Data comparison from 2011 to 2022
      </p>

      <Card className="mt-6 overflow-hidden p-0">
        <TabGroup defaultIndex={0}>
          <TabList className="space-x-0 bg-tremor-background-muted">
            {summary.map((tab, index) => (
              <>
                <Tab
                  key={tab.name}
                  className="py-4 pl-5 pr-12 text-left ui-selected:bg-white ui-selected:shadow-inner ui-selected:font-semibold ui-focus-visible:ring-2 ui-focus-visible:ring-blue-400 ui-focus-visible:ring-offset-2"
                >
                  <span className="block text-black">{tab.name}</span>
                  <span className="mt-1 block text-tremor-metric font-semibold text-black">
                    {tab.value}
                  </span>
                </Tab>
                {index < summary.length - 1 && (
                  <div
                    className="border-r border-tremor-border"
                    aria-hidden={true}
                  />
                )}
              </>
            ))}
          </TabList>

          <TabPanels>
            {summary.map((tab) => (
              <TabPanel key={tab.name} className="p-6">
                <AreaChart
                  data={data}
                  index="year"
                  categories={[tab.name]}
                  valueFormatter={valueFormatter}
                  showGradient={true}
                  showLegend={false}
                  yAxisWidth={60}
                  className="hidden h-96 sm:block text-black"
                  customTooltip={({ payload }) => (
                    <div className="bg-white p-2 rounded text-black shadow">
                      {payload?.map((entry, index) => (
                        <div key={index}>{`${entry.name}: ${valueFormatter(
                          entry.value
                        )}`}</div>
                      ))}
                    </div>
                  )}
                />

                <AreaChart
                  data={data}
                  index="year"
                  categories={[tab.name]}
                  valueFormatter={valueFormatter}
                  showGradient={true}
                  showLegend={false}
                  showYAxis={true}
                  startEndOnly={false}
                  className="h-72 sm:hidden text-black"
                  customTooltip={({ payload }) => (
                    <div className="bg-white p-2 rounded text-black shadow">
                      {payload?.map((entry, index) => (
                        <div key={index}>{`${entry.name}: ${valueFormatter(
                          entry.value
                        )}`}</div>
                      ))}
                    </div>
                  )}
                />

                <div className="mt-6 flex justify-center">
                  <Legend
                    categories={[
                      `${tab.name} (${
                        tab.name === "Vehicle Ownership" ? "vehicles" : "people"
                      })`,
                    ]}
                    colors={
                      tab.name === "Vehicle Ownership" ? ["blue"] : ["gray"]
                    }
                    className="text-black"
                    orientation="horizontal"
                  />
                </div>
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </Card>
    </>
  );
}
