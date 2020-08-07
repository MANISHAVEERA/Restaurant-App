import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {Button,Modal, ModalHeader, ModalBody,Form,FormGroup,Label,Input,FormFeedback} from 'reactstrap';

class CommentForm extends React.Component {
    state = {
        isModalOpen : false,
        author:"",
        rating:"",
        comment:"",
        touched : {
            author:false,
            comment:false
        }
    }

    toggleModal = ()=>{
        this.setState({isModalOpen:!this.state.isModalOpen})
    }

    inputHandler = (event)=>{
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({[name]:value , touched:{...this.state.touched,[name]:true}})
    }

    onSubmitHandler = (e)=>{
        window.alert("author : "+this.state.author +"     rating : "+this.state.rating + "     comment :"+this.state.comment)
        e.preventDefault()
    }


    inputValid = (author,comment)=>{
        const errors = {
            author:"",
            comments:""
        }
        if(this.state.touched.author && author.length<=3){
            errors.author = "The author name must be greater than 3 letters and should be < 15 letters"
        }else if(this.state.touched.author && author.length>=15){
            errors.author = "The author name must be less than 15 letters"
        }else if(this.state.touched.comment && comment.length === 0){
            errors.comments = "Dont leave the comments empty, type any comments"
        }
        return errors
    }

    render() {
        const errors = this.inputValid(this.state.author,this.state.comment)
        return (
            <div>
                <Button outline color="secondary" onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span>Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmitHandler}>
                            <FormGroup>
                                <Label html="Rating">Rating</Label>
                                <Input type="select" name="rating" id="rating" onBlur={this.inputHandler}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>

                            <FormGroup>
                                <Label html="Name">Your Name</Label>
                                <Input type="text" placeholder="Your name" id="author" name="author" valid={errors.author ===""} invalid={errors.author!==""} onKeyUp={this.inputHandler}></Input>
                                <FormFeedback>{errors.author}</FormFeedback>
                            </FormGroup>
                            <FormGroup >
                                <Label html="comment">Comments</Label>
                                    <Input type="textarea" id="comment" name="comment" valid={errors.comments ===""} invalid={errors.comments!==""} onKeyUp={this.inputHandler}></Input> 
                                    <FormFeedback>{errors.comments}</FormFeedback>
                            </FormGroup>
                            <Button type="submit" value="submit" className="bg-primary">Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


const RenderDish = (props) => {
    return(
        <Card>
            <CardImg top src={props.dish.image} alt={props.dish.name} />
            <CardBody>
            <CardTitle><b>{props.dish.name}</b></CardTitle>
            <CardText>{props.dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

const RenderComments = (props) =>{
    return(
        <>
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {props.comments.map((items)=>{
                    return(
                        <li key={items.id}>
                            <p>{items.comment}</p>
                            <p style={{fontStyle:'italic'}}>-- {items.author} , {moment(items.date).format('ll')}</p><hr/>
                        </li>
                    )
                })}
            </ul>
            <CommentForm />
        </>
    )
}




const DetailDish= (props) => {

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1" style={{border:'1px solid lightGray', padding:'20px'}}>
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        </div>
    )
}

export default DetailDish;
