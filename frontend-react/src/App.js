import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  
  
  constructor (){
    super(); 
    this.state = {
      companies:[],
      mot: 'research',
      resultsComparaison: [],
      perComparaison: 'Sector', 
      onComparaison: 'Price',
      resultsCount:[],
      perCount:'Sector'
    };

    this.handleClickCompany = this.handleClickCompany.bind(this);
    this.handleClickComparaison = this.handleClickComparaison.bind(this);
    this.handleClickCount = this.handleClickCount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeComparaisonPer = this.handleChangeComparaisonPer.bind(this);
    this.handleChangeComparaisonOn = this.handleChangeComparaisonOn.bind(this); 
    this.handleChangeCount = this.handleChangeCount.bind(this); 

  }

  handleClickCompany () {
    var url = 'http://localhost:9696/company'; 
    url = url + "?mot=" + this.state.mot;
    console.log(url); 
    axios.get(url, {responseType: 'json'})
    .then(response => {
      this.setState({companies:response.data})
    });
  }

  handleClickComparaison () {
    var url = 'http://localhost:9696/compare'; 
    if(this.state.perComparaison !== '' && this.state.onComparaison !== ''){
      url = url + "?per=" + this.state.perComparaison + "&on=" + this.state.onComparaison ;
    }
    axios.get(url, {responseType: 'json'})
    .then(response => {
      this.setState({resultsComparaison:response.data});
    });
  }

  handleClickCount () {
    var url = 'http://localhost:9696/count'; 
    if(this.state.perCount !== ''){
      url = url + "?per=" + this.state.perCount ; 
    }
    axios.get(url, {responseType: 'json'})
    .then(response => {
      this.setState({resultsCount:response.data});
    });
  }

  handleChange(e){
    this.setState({mot: e.target.value});
  }

  handleChangeComparaisonPer(e) {
    this.setState({perComparaison: e.target.value});
  }

  handleChangeComparaisonOn(e) {
    this.setState({onComparaison: e.target.value});
  }

  handleChangeCount(e) {
    this.setState({perCount: e.target.value});
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Stocks Exchange</h1>
        </header>
        <p className="App-intro">
          To get started you can make a simple research to found companies
        </p>

        <div>
        <h2>Find a company</h2>
          <div>
          <p> Make a simple research on the company name</p>
            <form>
              Which company ? : <input type="String" value={this.state.mot} onChange={this.handleChange}/>
            </form> 
          </div> 
          <br/>
          <button class='Button' className='button' onClick={this.handleClickCompany}> Click Me </button>
        </div>
        <br/>
        <table>
          <thead className='thead'>
            <tr>
              <th> Company </th>
              <th> Price </th>
              <th> Country </th>
              <th> Sector </th>
              <th> Average Volume </th>
              <th> Beta </th>
              <th> Change </th>
              <th> ROI </th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.companies.map(function(res){
                return <tr>
                    <td>{res.Company}</td>
                    <td> {res.Price}</td>
                    <td> {res.description.Country} </td>
                    <td> {res.description.Sector}</td>
                    <td> {res['Average Volume']}</td>
                    <td> {res.Beta}</td>
                    <td> {res.Change}</td>
                    <td> {res.ROI}</td>
                  </tr>
              })
            }
          </tbody>
        </table>

        <div>
          <div>
            <h2>What do you want compare ? On what ?</h2>
            <p> Choose the attribute and the comparator</p>
            <div class="global-gauche">
              <form>
                <div className="radio">
                  <label>
                    <input type="radio" value="Sector" checked={this.state.perComparaison === 'Sector'} onChange={this.handleChangeComparaisonPer}/>
                    Per sector
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" value="Country" checked={this.state.perComparaison === 'Country'} onChange={this.handleChangeComparaisonPer}/>
                    Per country
                  </label>
                </div>
              </form> 
            </div>
            
            <div class="global-droite">
              <form>
                <div className="radio">
                  <label>
                    <input type="radio" value="Price" checked={this.state.onComparaison === 'Price'} onChange={this.handleChangeComparaisonOn}/>
                    On price
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" value="ROI" checked={this.state.onComparaison === 'ROI'} onChange={this.handleChangeComparaisonOn}/>
                    On ROI
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" value="Average Volume" checked={this.state.onComparaison === 'Average Volume'} onChange={this.handleChangeComparaisonOn}/>
                    On volume average
                  </label>
                </div>
              </form> 
            </div>
            <button class='Button' className='button' onClick={this.handleClickComparaison}> Click Me </button>
          </div> 
        </div>
        <br />
        <table>
          <thead>
            <tr>
              <th> {this.state.perComparaison} </th>
              <th> Maximum  </th>
              <th> Average</th>
              <th> Minimum </th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.resultsComparaison.map(function(res){
              return <tr>
                    <td> {res.key} </td>
                    <td> {res.maximum.value} </td>
                    <td> {res.average.value} </td>
                    <td> {res.minimum.value} </td>
                  </tr>
            })
          }
          </tbody>
        </table>


         <div>
         <h2>How many companies ?</h2>
         <p> Choose the parameter to count how many companies there are. </p>
          <div>
            <form>
            <div className="radio">
                  <label>
                    <input type="radio" value="Sector" checked={this.state.perCount === 'Sector'} onChange={this.handleChangeCount}/>
                    Per sector
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" value="Country" checked={this.state.perCount === 'Country'} onChange={this.handleChangeCount}/>
                    Per country
                  </label>
                </div>
            </form> 
          </div> 
          <br/>
          <button class='Button' className='button' onClick={this.handleClickCount}> Click Me </button>
        </div>
        <br/>
        <table>
          <thead>
            <tr>
              <th> {this.state.perCount} </th>
              <th> Number of companies  </th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.resultsCount.map(function(res){
              return <tr>
                    <td> {res.key} </td>
                    <td> {res.doc_count} </td>
                </tr>
            })
          }
          </tbody>
        </table>
        <br/>
        <h4> Powered by Aurelie </h4>
      </div>
      
    )
  }
}


export default App;
