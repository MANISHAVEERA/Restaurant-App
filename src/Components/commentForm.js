import React, { Component } from 'react';
import {Button,Modal, ModalHeader, ModalBody,Form,FormGroup,Label,Input,FormFeedback} from 'reactstrap';

export default class CommentForm extends Component {
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
