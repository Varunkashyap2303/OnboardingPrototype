import {
  AreaChart,
  Card,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@tremor/react";
import React from "react";

const data = [
  { year: "2017", "Vehicle Ownership": 209495, Population: 59996 },
  { year: "2018", "Vehicle Ownership": 214408, Population: 62428 },
  { year: "2019", "Vehicle Ownership": 236429, Population: 65177 },
  { year: "2020", "Vehicle Ownership": 215728, Population: 67455 },
  { year: "2021", "Vehicle Ownership": 188855, Population: 69396 },
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
      <h3 className="text-black text-xl sm:text-lg font-semibold">
        Vehicle Ownership vs Population
      </h3>
      <p className="mt-1 text-black text-sm md:text-base">
        Data comparison from 2017 to 2021
      </p>

      <Card className="mt-6 overflow-hidden p-0">
        <TabGroup defaultIndex={0}>
          <TabList className="space-x-0 bg-tremor-background-muted">
            {summary.map((tab, index) => (
              <React.Fragment key={tab.name}>
                <Tab
                  key={tab.name}
                  className="py-4 pl-5 pr-12 text-left ui-selected:bg-white ui-selected:shadow-inner ui-selected:font-semibold ui-focus-visible:ring-2 ui-focus-visible:ring-blue-400 ui-focus-visible:ring-offset-2 text-xs sm:text-sm md:text-base"
                >
                  <span className="block text-black font-semibold">
                    {tab.name}
                  </span>
                </Tab>
                {index < summary.length - 1 && (
                  <div
                    className="border-r border-tremor-border"
                    aria-hidden={true}
                  />
                )}
              </React.Fragment>
            ))}
          </TabList>

          <TabPanels>
            {summary.map((tab) => (
              <TabPanel
                key={tab.name}
                className="p-6 text-xs sm:text-sm md:text-base"
              >
                <AreaChart
                  data={data}
                  index="year"
                  categories={[tab.name]}
                  valueFormatter={valueFormatter}
                  showGradient={true}
                  showLegend={false}
                  yAxisWidth={60}
                  className="hidden h-96 sm:block text-black text-xs sm:text-sm md:text-base"
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

                <div className="mt-6 wrap justify-center">
                  <p className="text-black">
                    {tab.name === "Vehicle Ownership" ? (
                      <>
                        This data is retrieved from Motor Vehicle Census,
                        Australia methodology 2021
                      </>
                    ) : (
                      <>
                        This data is retrieved from Australian Bureau of
                        Statistics (ABS) Regional population 2021
                      </>
                    )}
                  </p>
                </div>
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </Card>
    </>
  );
}
