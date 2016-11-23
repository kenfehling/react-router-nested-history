import { setTabs, push } from '../../dist/react-nav-thing';
import $ from 'jquery';

$(() => {
  setTabs('/a', '/b', '/c');
  $('#link1').click(() => push('b'));
});