import React, {Component} from 'react';
import axios from 'axios';
import IndivBlogPostDetails from './IndivBlogPostDetails';
import './../styles/adminEditor.css';
import {connect} from 'react-redux';
class AdminBlog extends Component {
  constructor(props){
    super(props);
      this.state ={
        fetchedPosts: [],
        checkAllBoxes: false,
        amountChecked: 0
      }
  }

  componentDidMount(){
    axios.get('/api/blogs').then(res => {
      console.log("Res data is:", res.data)
      this.setState({
        fetchedPosts: res.data
      })
    })
  .catch(err => console.log("Error is: ", err))
  }


  markAllChecked(){
    this.setState({
      checkAllBoxes: !this.state.checkAllBoxes
    })
  }


  render(){
    console.log("All boxes checked ", this.state.checkAllBoxes)
    console.log("FetchedPosts Array is :", this.state.fetchedPosts)

    const checkedBoxStyle = { backgroundColor: "#5182EA", borderColor: "#5182EA"}

    const itemRowSelectedStyle = { backgroundColor: "#E8E8E8" }

    const allPosts = this.state.fetchedPosts.map((post, i) => { return (
      <IndivBlogPostDetails key={i} post={post} index={i} checkAll={this.state.checkAllBoxes} checkedQty={0}/>
    )
    })

    const fullPageStyle = { width: "100%" }

    const postAmount = this.state.fetchedPosts.length == 1 ? "item selected" : "items selected"

    return(
      <main className="adminWrapper" style={ this.props.dropdownDisplayed ? null : fullPageStyle}>
        <section className="adminContentContainer">
          <div className="adminPageHeaderContainer">
            <p className="adminPageHeader">Current Blog Posts</p>
          </div>
          <div className="itemsSelected">
            <p>{this.state.amountChecked} {postAmount}</p>
          </div>
          <div className="columnTitles postDetailsWrapper" style={this.state.checkAllBoxes ? itemRowSelectedStyle : null}>
            <div className="blogDetailsItem1">
              <div className="checkbox" onClick={this.markAllChecked.bind(this)} style={this.state.checkAllBoxes ? checkedBoxStyle : null}><i className="fa fa-check fa-fw whiteCheck" aria-hidden="true"></i></div>
            </div>
            <div className="blogDetailsItem2">
              <p>Title</p>
            </div>
            <div className="blogDetailsItem3">
              <p>Publish Date</p>
            </div>
            <div className="blogDetailsItem4">
              <p>Author</p>
            </div>
            <div className="blogDetailsItem5">
            </div>
          </div>
          {allPosts}
        </section>
      </main>
    )
  }
}

function mapStateToProps(state){
  return{
    dropdownDisplayed: state.clicked
  }
}

export default connect(mapStateToProps)(AdminBlog);
