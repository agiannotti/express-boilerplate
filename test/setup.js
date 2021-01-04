const supertest = require('supertest');
const { expect } = require('chai');

global.supertest = supertest;
global.expect = expect;

console.log('This file always runs first for any test');
