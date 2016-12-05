// @flow
/* globals describe, it, expect */
declare var describe:any;
declare var it:any;
declare var expect:any;
import * as db from '../src/db';
import type { State, Container, ContainerConfig } from '../src/types';

describe('db', () => {

  it('does things', () => {

    const configs:ContainerConfig[] = [{
      initialUrl: '/a',
      urlPatterns: ['/a', '/a/*']
    }, {
      initialUrl: '/b',
      urlPatterns: ['/b', '/b/*']
    }];

    db.addContainerGroup(configs);

    const result = db.getContainers();

    //console.log(result);

  });

});