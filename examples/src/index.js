import { setTabs, switchToTab, push } from '../../dist/react-nav-thing';
import $ from 'jquery';

$(() => {
  setTabs('/a', '/b', '/c');
  $('#tab1').click(() => switchToTab(0));
  $('#tab2').click(() => switchToTab(1));
  $('#tab3').click(() => switchToTab(2));
  $('#link1').click(() => push('/a/1'));
});