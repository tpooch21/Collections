import React from 'react';
import $ from 'jquery';
import CollectionList from './CollectionList.jsx';
import Modal from './Modal/Modal.jsx';
import styled from 'styled-components';

const Title = styled.h1`
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #2b273c;
  margin-bottom: 24px;
`;

const Main = styled.div`
  width: 1174px;
  height: 360px;
  margin: auto;
  position: relative;
`;

// MODAL
// State of app should have a display property set to a boolean, determining whether or not to show modal
// Add a currentCollection property to state too - when a collection is selected in collectionItem, will set this state to the selected collection
//  Also, collection Click handler should make a request for all restaurants in the selected collection from the database
//  Those restaurants can be added to a current restaurants component in state, which will be passed to modal
// Can just pass the state to modal when rendering
//

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantID: this.props.restID,
      restaurantName: null,
      collectionList: [],
      stage: 0,
      displayModal: true
    };

    this.getNextFiveCollections = this.getNextFiveCollections.bind(this);
    this.getPreviousFiveCollections = this.getPreviousFiveCollections.bind(this);
  };


  componentDidMount() {
    this.getCollections();
  }

  getCollections() {
    $.ajax({
      method: 'GET',
      url: `http://localhost:4568/${this.state.restaurantID}/collections`,
      success: (data) => {
        console.log('Logging data from server => ', data);
        this.setState({
          restaurantName: data[data.length - 1],
          collectionList: data.slice(0, data.length - 1)
        });
      },
      error: () => {
        console.log('Error fetching data from server');
      }
    });
  }

  getNextFiveCollections() {
    this.setState({
      stage: 1
    });
  }

  getPreviousFiveCollections() {
    this.setState({
      stage: 2
    });
  }

  render() {

    return (
      <Main>
        <Title>Collections Including {this.state.restaurantName}</Title>
        <CollectionList state={this.state} nextFive={this.getNextFiveCollections} previousFive={this.getPreviousFiveCollections}/>
        <Modal state={this.state}/>
      </Main>
    );
  }
};

export default App;