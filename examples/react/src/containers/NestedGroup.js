import React, { Component } from 'react'
import {
  Container, ContainerGroup, WindowGroup, Window, HistoryRoute, HeaderLink,
  HistoryLink, BackLink
} from 'react-router-nested-history'
import './NestedGroup.css'
import Helmet from 'react-helmet'

const regex = c => `:category(${c})`

const foods = {
  'Fruits': ['Apple', 'Orange', 'Pear', 'Banana'],
  'Vegetables': ['Carrot', 'Celery', 'Cucumber', 'Pepper'],
  'Meat': ['Chicken', 'Pork', 'Beef', 'Lamb', 'Fish'],
  'Dairy': ['Milk', 'Cheese']
}
const categories = Object.keys(foods)

const FoodsHeader = () => (
  <div className='header'>
    {categories.map(c => (
      <HeaderLink key={c}
                  toContainer={c}
                  className='header-item'
                  activeClassName='active-header-item'>
        {c}
      </HeaderLink>
    ))}
  </div>
)

const FoodsDetail = ({match:{params:{food, category}}, className}) => (
  <div>
    <BackLink />
    <p>{category} > {food}</p>
    <Helmet title={category + ' - ' + food} />
  </div>
)

const FoodsMaster = ({match:{params:{category}}}) => (
  <div>
    <div>Category: {category}</div>
    <ul>
      {foods[category].map(food => (
        <li key={food}>
          <HistoryLink to={`/foods/${category}/${food}`}>
            {food}
          </HistoryLink>
        </li>
      ))}
    </ul>
    <Helmet title={category} />
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
      <p>{categories[0]} is considered a default tab.</p>
      <p>When selecting an already active tab, it will go to the top of that tree.</p>
    </div>
    <WindowGroup name='nested'>
      <Window className='window nested-window foods'>
        <ContainerGroup name='foods' gotoTopOnSelectActive={true}>
          <FoodsHeader />
          {categories.map(c => (
            <Container
              name={c}
              key={c}
              initialUrl={`/foods/${c}`}
              resetOnLeave={true}
              patterns={[`/foods/${regex(c)}`, `/foods/${regex(c)}/:food`]}
            >
              <div>
                <HistoryRoute path={`/foods/${regex(c)}`} exact
                              component={FoodsMaster} />
                <HistoryRoute path={`/foods/${regex(c)}/:food`}
                              component={FoodsDetail} />
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