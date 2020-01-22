import React from "react"
import { connect } from "react-redux"
import { format,differenceInDays, parseISO } from "date-fns"
import pt from 'date-fns/locale/pt-BR';
import AddCardButton from "../components/AddCardButton"
import Column from "../components/Column"
import Toast from "../components/Toast"
import Modal from "../components/Modal"
import {
  showForm, hideForm, updateForm, submitForm,
  dragStart, dragEnd, dragEnter, dragLeave, dropStart, drop,
  dismissNotification, showModalRequest, hideModal
} from "../actions"

const Funnel = (props) => (
  <div>
    {props.notification &&
      <Toast
        text={props.notification}
        onDismiss={props.onDismissNotification}
      />
    }

    <AddCardButton onClick={props.onClickAdd} />

    <Modal
      show={props.showModal}
      sale={props.sale}
      stageTitles={props.stageTitles}
      onExit={props.onModalExit}
    />
    <div className="flex margin-top-lg">
      {props.columns.map((column, index) =>
        <Column
          key={column.id}
          id={column.id}
          index={index}
          title={column.title}
          cards={column.cards}
          dropzone={column.dropzone}
          showForm={props.showForm && index == 0}
          disableForm={props.disableForm}
          onInputChange={props.onInputChange}
          onFormSubmit={props.onFormSubmit}
          onCancelAdd={props.onCancelAdd}
          onDragStart={props.onDragStart}
          onDragEnd={props.onDragEnd}
          onDragEnter={props.onDragEnter}
          onDragLeave={props.onDragLeave}
          onDrop={props.onDrop}
          onCardClick={props.onCardClick}
        />
      )}
    </div>
  </div>
)

const mapStateToProps = ({ columns, drag, form, notification, modal }) => (
  {
    columns: columns.map((column, index) => {
      if (index == drag.from)
        return (
          { ...column,
            cards: column.cards.map(card =>
              card.id == drag.id
              ? { ...card, dragged: true }
              : card
            )
          }
        )
      else if (index == drag.to && drag.status == "valid" && !column.dropzone)
        return ({ ...column, dropzone: drag.height })
      else
        return column
    }),
    stageTitles: columns.reduce((titlesMap, column) => {
      // Passing titles to the singular.
      const singular = { closed: "Ganho", lost: "Perdido" }
      
      titlesMap[column.id] = singular[column.id] || column.title
      
      return titlesMap
    }, {}),
    // pastDays stores how many days a step lasted
    sale: {
      ...modal.sale,
      progressions: modal.sale &&
        modal.sale.progressions.map((progression, index) => ({
          ...progression,
          pastDays: index>0? diffBetweenDays(
            modal.sale.progressions[index-1].created_at,
            progression.created_at
          ): null,
          formattedDate: formatDate(progression.created_at),
          formattedTime: formatTime(progression.created_at)
        }))
    },
    showModal: modal.show,
    showForm: form.show,
    disableForm: form.waiting,
    notification: notification
  }
)

const mapDispatchToProps = dispatch => (
  {
    onClickAdd: () => dispatch(showForm()),
    onCancelAdd: () => dispatch(hideForm()),
    onInputChange: (name, value) => dispatch(updateForm(name, value)),
    onFormSubmit: () => dispatch(submitForm()),
    onDragStart: (columnIndex, id, height) => {
      dispatch(dragStart(columnIndex, id, height))
    },
    onDragEnd: (columnIndex, id) => dispatch(dragEnd(columnIndex, id)),
    onDragEnter: (index) => dispatch(dragEnter(index)),
    onDragLeave: (index) => dispatch(dragLeave(index)),
    onDrop: (index) => {
      dispatch(dropStart(index))
      dispatch(drop())
    },
    onDismissNotification: () => dispatch(dismissNotification()),
    onCardClick: (id) => dispatch(showModalRequest(id)),
    onModalExit: () => dispatch(hideModal())
  }
)

const diffBetweenDays = (firstDate, lastDate) => (
  differenceInDays(
    parseISO(firstDate),
    parseISO(lastDate)
  )
)

const formatDate = (date) => (
  format(
    parseISO(date),
    'dd/MM/yyyy',{ locale: pt }
  )
)

const formatTime = (date) => (
  format(
    parseISO(date),
    'HH:mm',{ locale: pt }
  )
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Funnel))
