import React from "react"
import ColumnHeader from "./ColumnHeader"
import Dropzone from "./Dropzone"
import Card from "./Card"
import Form from "./Form"

const Column = (props) => {
  const onDrop = event => {
    event.preventDefault()
    props.onDrop(props.index)
  }

  const totalAmount = props.cards.reduce((acc, card) => acc + card.amount, 0)

  return (
    <div
      id={`column-${props.id}`}
      className=
        "margin-right-sm flex-grow full-height min-width-200 max-width-300"
      onDragEnter={() => props.onDragEnter(props.index)}
      onDragLeave={() => props.onDragLeave(props.index)}
      onDragOver={event => event.preventDefault()}
      onDrop={onDrop}
    >
      <ColumnHeader
        id={props.id}
        title={props.title}
        amount={totalAmount}
        count={props.cards.length}
      />

      <div className="margin-top-sm">
        {props.showForm &&
          <Form
            disabled={props.disableForm}
            onSubmit={props.onFormSubmit}
            onChange={props.onInputChange}
            onCancel={props.onCancelAdd}
          />
        }

        {props.dropzone && <Dropzone height={props.dropzone} />}

        {props.cards.map(card =>
          <Card
            key={card.id}
            id={card.id}
            columnId={card.stage}
            columnIndex={props.index}
            title={card.product}
            customerName={card.customer}
            amount={card.amount}
            dragged={card.dragged}
            onDragStart={props.onDragStart}
            onDragEnd={props.onDragEnd}
            onClick={props.onCardClick}
          />
        )}
      </div>
    </div>
  )
}

export default React.memo(Column)
