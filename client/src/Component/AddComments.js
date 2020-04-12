import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { addComments } from "../store/actions/itineraryActions";

class AddComments extends Component {
  state = {
    modal: false,
    comment: "",
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      comment: this.props.itineraries.comment,
    };

    //////add comments
    this.props.addComments(newComment);
    ///////////close modal
    this.toggle();
  };
  //   const [show, setShow] = useState(false);

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  render() {
    return (
      <div>
        <>
          <Button variant="primary" color="primary" onClick={this.toggle}>
            Add Comment
          </Button>

          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>
              Add comment to the itinerary
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="comments">Comments </Label>
                  <Input
                    type="text"
                    name="comments"
                    id="comments"
                    onChange={this.onChange}
                  />
                  <Button color="dark" block style={{ marginTop: "2rem" }}>
                    Add Comments
                  </Button>
                </FormGroup>
              </Form>{" "}
            </ModalBody>
          </Modal>
        </>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("mamToState", state);

  return {
    comments: state.itineraries.comments,
    itineraries: state.itineraries.itineraries,
    user: state.users,
  };
};
const mapDispatchToProps = (dispatch) => ({
  addComments: (newComment) => dispatch(addComments(newComment)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddComments);
