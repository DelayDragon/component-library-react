// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx']
// };
// import {Config} from '@jest/types'

// export default {
//   preset: 'ts-jest',
//   clearMocks: true,
//   coverageDirectory: "coverage",
//   testEnvironment: "jsdom",
//   moduleFileExtensions: ['ts', 'js', 'json', 'tsx'],
//   moduleDirectories: ['node_modules', 'src'],
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1'
//   },
//   setupFiles: ['./test/setup.js'],
//   // 引入jest-enzyme扩展断言支持
//   setupFilesAfterEnv: ['./node_modules/jest-enzyme/lib/index.js'],
//   globals: {
//     'ts-jest': {
//       // 指定ts-jest使用的tsconfig配置
//       tsconfig: 'tsconfig.test.json'
//     }
//   }
// } as Config.InitialOptions;
export default  {
  roots: [
      "<rootDir>/test"
  ],
  testRegex: ['test/(.+)\\.test\\.(jsx?|tsx?)$','test/^\w+$/^\w+$/(.+)\\.test\\.(jsx?|tsx?)$'],
  transform: {
      "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']
};