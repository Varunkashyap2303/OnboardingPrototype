// 'use client';

import { AreaChart, Card } from '@tremor/react';

const data = [
  {
    year: '2011',
    'Vehicle Ownership': 2221500,
    'Population': 3500249
  },
  {
    year: '2012',
    'Vehicle Ownership': 2250120,
    'Population': 3520000
  },
  {
    year: '2013',
    'Vehicle Ownership': 2278900,
    'Population': 3540000
  },
  {
    year: '2014',
    'Vehicle Ownership': 2304500,
    'Population': 3560000
  },
  {
    year: '2015',
    'Vehicle Ownership': 2331200,
    'Population': 3580000
  },
  {
    year: '2016',
    'Vehicle Ownership': 2357800,
    'Population': 3600000
  },
  {
    year: '2017',
    'Vehicle Ownership': 2384500,
    'Population': 3620000
  },
  {
    year: '2018',
    'Vehicle Ownership': 2411200,
    'Population': 3640000
  },
  {
    year: '2019',
    'Vehicle Ownership': 2437800,
    'Population': 3660000
  },
  {
    year: '2020',
    'Vehicle Ownership': 2464500,
    'Population': 3680000
  },
  {
    year: '2021',
    'Vehicle Ownership': 2491200,
    'Population': 3700000
  },
  {
    year: '2022',
    'Vehicle Ownership': 2517800,
    'Population': 3720000
  },
];

const valueFormatter = (number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

export default function Example() {
  return (
    <>
      <Card className="p-0 mb-6 ml-6 mr-6 overflow-x-auto">
        <div className="p-6">
          <h3 className="font-medium font-semibold text-gray-800">
            Vehicle Ownership Number
          </h3>
          <p className="text-tremor-default leading-6 text-gray-800">
            This chart shows the number of vehicle ownership requests over the past years.
          </p>
        </div>
        <div className="border-t border-tremor-border p-6 ">
          <ul
            role="list"
            className="flex flex-wrap items-center gap-x-10 gap-y-4"
          >
            <li>
              <div className="flex items-center space-x-2">
                <span
                  className="size-3 shrink-0 rounded-sm bg-blue-500"
                  aria-hidden={true}
                />
                <p className="font-semibold text-gray-800">
                  260,526
                </p>
              </div>
              <p className="text-tremor-default text-gray-800">
                latest vehicle ownership
              </p>
            </li>
            <li>
              <div className="flex items-center space-x-2">
                <span
                  className="size-3 shrink-0 rounded-sm bg-gray-500"
                  aria-hidden={true}
                />
                <p className="font-semibold text-gray-800">
                  3700000
                </p>
              </div>
              <p className="text-tremor-default text-gray-800">
                Population
              </p>
            </li>
          </ul>
          <AreaChart
            data={data}
            index="year"
            type="stacked"
            colors={['blue', 'gray']}
            categories={['Vehicle Ownership', 'Population']}
            showLegend={false}
            showGradient={true}
            yAxisWidth={150}
            valueFormatter={valueFormatter}
            className="mt-10 h-72 sm:block"
            // fill="solid"
          />
        </div>
      </Card>
    </>
  );
}