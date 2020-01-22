import React from "react"
import Currency from "./Currency"
import companyIcon from "images/company.png"

const Card = (props) => {
  const onDragStart = (event) => {
    // Without this, some browsers don't trigger dragEnd
    event.dataTransfer.setData("id", props.id)
    props.onDragStart(props.columnIndex, props.id, event.target.clientHeight)
  }

  return (
    <div
      id={`card-${props.id}`}
      className={`
        padding-md border-rounded bg-white margin-bottom-sm break-word
        box-shadow ${props.dragged && "opacity-6"}
      `}
      draggable="true"
      onDragStart={onDragStart}
      onDragEnd={() => props.onDragEnd(props.columnIndex, props.id)}
      onClick={() => props.onClick(props.id)}
    >
      <div className="margin-top-sm margin-bottom-sm text-tight">
        {props.title}
      </div>
      <div>
        <img
          src={companyIcon}
          className="margin-right-sm height-100 vertical-align-middle opacity-6"
        />
        <span className="vertical-align-middle text-smaller">
          {props.customerName}
        </span>
      </div>
      <div className="margin-top-md text-right text-smaller text-success">
        <Currency amount={props.amount} />
      </div>
    </div>
  )
}

export default React.memo(Card)
