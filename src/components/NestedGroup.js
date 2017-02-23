import React, { Component } from 'react'
import {
  Container, ContainerGroup, WindowGroup, Window, HistoryRoute, HeaderLink,
  HistoryLink, BackLink
} from 'react-router-nested-history'
import './NestedGroup.css'
import Helmet from 'react-helmet'

const regex = c => `:category(${c})`

const foods = {
  'Fruits': {
      'Apple': ['Green', 'Red'],
      'Orange': ['Tangerine', 'Mandarin', 'Clementine'],
      'Banana': ['Plantain']
  },
  'Vegetables': {
    'Carrot': ['Baby', 'Full'],
    'Pepper': ['Green', 'Red', 'Yellow', 'Orange'],
  },
  'Meat': {
    'Poultry': ['Chicken', 'Turkey', 'Duck'],
    'Fish': ['Salmon', 'Flounder'],
    'Pork': ['Ham', 'Chop'],
    'Beef': ['Hamburger', 'Steak']
  },
  'Dairy': {
    'Milk': ['4%', '2%', '1%', 'Skim'],
    'Cheese': ['Cheddar', 'Swiss', 'Gouda']
  }
}
const foodGroups = Object.keys(foods)

const FoodsHeader = () => (
  <div className='header'>
    {foodGroups.map(c => (
      <HeaderLink key={c}
                  toContainer={c}
                  className='header-item'
                  activeClassName='active-header-item'>
        {c}
      </HeaderLink>
    ))}
  </div>
)

const FoodsMaster = ({match:{params:{category}}}) => (
  <div>
    <div className='food-title'>{category}</div>
    <ul>
      {Object.keys(foods[category]).map(foods => (
        <li key={foods}>
          <HistoryLink to={`/foods/${category}/${foods}`}>
            {foods}
          </HistoryLink>
        </li>
      ))}
    </ul>
    <Helmet title={category} />
  </div>
)

const FoodDetail = ({match:{params:{category, food}}, className}) => (
  <div>
    <BackLink />
    <p className='food-title'>{category} > {food}</p>
    <ul>
      {foods[category][food].map(type => (
        <li key={type}>
          <HistoryLink to={`/foods/${category}/${food}/${type}`}>
            {type}
          </HistoryLink>
        </li>
      ))}
    </ul>
    <Helmet title={category + ' - ' + food} />
  </div>
)

const FoodTypeDetail = ({match:{params:{category, food, type}}, className}) => (
  <div>
    <BackLink />
    <p className='food-title'>{category} > {food} > {type}</p>
    <Helmet title={category + ' - ' + food + ' - ' + type} />
  </div>
)

const Notes = () => (
  <div>
    This just has notes in it
  </div>
)

export default () =>(
  <div className="windows">
    <h2>Nested group example</h2>
    <div className="description">
      <p>Two groups are nested inside another group.</p>
      <p>{foodGroups[0]} is considered the default tab.</p>
      <p>When selecting an already active tab, it will go to the top of that tree.</p>
    </div>
    <WindowGroup name='nested'>
      <Window className='window nested-window foods'>
        <ContainerGroup name='foods' gotoTopOnSelectActive={true}>
          <FoodsHeader />
          {foodGroups.map(c => (
            <Container
              name={c}
              key={c}
              initialUrl={`/foods/${c}`}
              resetOnLeave={true}
              patterns={[
                `/foods/${regex(c)}`,
                `/foods/${regex(c)}/:food`,
                `/foods/${regex(c)}/:food/:type`
              ]}
            >
              <div>
                <HistoryRoute path={`/foods/${regex(c)}`} exact
                              component={FoodsMaster} />
                <HistoryRoute path={`/foods/${regex(c)}/:food`} exact
                              component={FoodDetail} />
                <HistoryRoute path={`/foods/${regex(c)}/:food/:type`} exact
                              component={FoodTypeDetail} />
              </div>
            </Container>
          ))}
        </ContainerGroup>
      </Window>
      <Window className='window nested-window notes'>
        <Container name='notes' initialUrl='/notes' patterns={['/notes']}>
          <HistoryRoute path='/notes' exact component={Notes} />
        </Container>
      </Window>
    </WindowGroup>
  </div>
)