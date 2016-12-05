// @flow

import { Database } from 'alasql';
import type { State, Container, ContainerConfig } from '../src/types';

const db = new Database();

db.exec(
 `CREATE TABLE containerGroup (
    id SERIAL PRIMARY KEY
  );
  
  CREATE TABLE container (
    id SERIAL PRIMARY KEY,
    initialUrl STRING,
    originalIndex INT,
    isDefault BOOLEAN,
    containerGroup INT REFERENCES containerGroup(id)
  );
  
  CREATE TABLE urlPattern (
    pattern STRING,
    container INT REFERENCES container(id)
  );
  
  CREATE TABLE page (
    id SERIAL PRIMARY KEY,
    url STRING,
    container INT REFERENCES container(id)
  );
  
  CREATE TABLE historyStack (
    id SERIAL PRIMARY KEY
  );
  
  CREATE TABLE historyItem (
    page INT REFERENCES page(id),
    stack INT REFERENCES historyStack(id)
  );
  
  CREATE TABLE history (
    id SERIAL PRIMARY KEY,
    back INT REFERENCES historyStack(id),
    current INT REFERENCES page(id),
    forward INT REFERENCES historyStack(id)
  );
  
  CREATE TABLE browserHistory (
    containerGroup INT REFERENCES containerGroup(id),
    history INT REFERENCES history(id)
  );
  
  CREATE TABLE containerHistory (
    container INT REFERENCES container(id),
    history INT REFERENCES history(id)
  );`
);

export function addContainerGroup(configs:ContainerConfig[]) {
  db.exec(`INSERT INTO containerGroup VALUES (null)`);
  const containerGroup = db.autoval('containerGroup', 'id');
  configs.forEach(config => {
    db.exec(
      `INSERT INTO container (initialUrl, originalIndex, isDefault, containerGroup) VALUES (?, ?, ?, ?)`,
      [config.initialUrl, 0, true, containerGroup]
    );
    const container = db.autoval('container', 'id');
    config.urlPatterns.forEach(urlPattern => {
      db.exec(
        `INSERT INTO urlPattern (pattern, container) VALUES (?, ?)`,
        [urlPattern, container]
      );
    });
  });
}

export function getUrlPatterns(containerId:number) : string[] {
  const result = db.exec(`
    SELECT *
    FROM urlPattern
    WHERE container = ?
  `, [containerId]);
  return result.map(r => r.pattern);
}

export function getContainers() : Container[] {
  const containers = db.exec(`
    SELECT *
    FROM container
  `);
  return containers.map(c => ({...c, urlPatterns: getUrlPatterns(c.id)}));
}

export function addPage(url:string, containerId:number) {
  db.exec(`
    INSERT INTO page (url, container)
    VALUES (?, ?)
  `, [url, containerId]);
}