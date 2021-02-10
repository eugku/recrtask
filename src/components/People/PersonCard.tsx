import React from 'react';
import {Link} from 'react-router-dom';
import GetName from '../common/GetName';
import { Person } from './types';

interface PropTypes {
  person: Person;
}

export default function PersonCard({person}: PropTypes) {
  return (
    <div className="cards-container">
      <div className="card">
        <Link to={`/people/${person.name}`}>
          <h2>{person.name}</h2>
        </Link>
        <h6>homeworld: <GetName type="planets" link={person.homeworld} /></h6>
      </div>
    </div>
  );
}
