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
    comments: "",
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
    // const newComment = this.props.itineraries.comments;
    const email = this.props.user.email;
    const newComments = this.state.comments;
    //////add comments
    this.props.addComments(email);
    ///////////close modal
    this.toggle();
  };
  //   const [show, setShow] = useState(false);

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  render() {
    const newComments = this.props.itineraries.comments;
    const itinerary = this.props.itineraries;
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
              <Form onSubmit={() => this.onSubmit(itinerary.name)}>
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
  addComments: (name, email) => dispatch(addComments(email, name)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddComments);
