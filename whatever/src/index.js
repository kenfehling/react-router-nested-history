import { setTabs, switchToTab, push } from '../../../dist/tab-history-library';
import $ from 'jquery';

$(() => {
  const tabs = setTabs('/a', '/b', '/c');
  $('#tab1').click(() => tabs.switchToTab(0));
  $('#tab2').click(() => tabs.switchToTab(1));
  $('#tab3').click(() => tabs.switchToTab(2));
  $('#link1').click(() => push('/a/1'));
});