import React from "react"
import {format, parseISO, differenceInDays} from 'date-fns'
import pt from 'date-fns/locale/pt-BR';

import cancelIcon from "images/cancel.png"
import Currency from './Currency'

const Modal = (props) => {
  return (
    props.show ?
    <div className="border-rounded fixed translate-50 top-50 left-50
      min-width-500 z-index-1 box-shadow-blurred"
    >
      <div className="border-rounded-top bg-default padding-xl
        flex space-between"
      >
        <div className="width-100">
          <div className="text-white text-larger text-bold">
            {props.sale.product}
          </div>
          <div className="text-white">
            {props.sale.customer}
          </div>
          <div className="text-white text-right">
            <Currency amount={props.sale.amount}/>
          </div>
        </div>
        <button className="height-100" onClick={props.onExit}>
          <img className="height-100 brightness-10" src={cancelIcon} />
        </button>
      </div>

      <div className="border-rounded-bottom bg-white padding-xl">
        <ul>
          {props.sale.progressions.map((progression, index)=> (
            <li
              className="flex space-between margin-bottom-xl"
              key={String(progression.id)}
            >
              <div>
                <strong>{props.stageTitles[progression.stage]}</strong>
                <br />
                <span className="text-gray">
                  {index>0 &&
                    pluralize(
                      differenceInDays(
                        parseISO(props.sale.progressions[index-1].created_at),
                        parseISO(progression.created_at)
                      ), 
                      "dia", 
                      "dias"
                  )}
                </span>
              </div>
              <div>
                <div className="text-right">
                  {format(
                    parseISO(progression.created_at),
                    'dd/MM/yyyy',{ locale: pt }
                  )}
                </div>
                <div className="text-right">
                  {format(
                    parseISO(progression.created_at),
                    'HH:mm',{ locale: pt }
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    :null
  )
}

const pluralize = (number, singular, plural) =>
  number + " " + (number > 1 ? plural : singular)

export default React.memo(Modal)

