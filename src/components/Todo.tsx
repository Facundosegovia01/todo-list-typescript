
import { type Todo as TodoType, type TodoId} from '../types'

interface Props extends TodoType { 
    onRemoveTodo: ({id}: TodoId) => void;
    onToggleCompleteTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
}

import React from "react"

export const Todo : React.FC<Props> = ({id, title, completed, onRemoveTodo, onToggleCompleteTodo}) => { 

    const handleChageCheckbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
        onToggleCompleteTodo ({
            id, completed: event.target.checked
        })
    }
    return (
        <div className="view">
            <input 
            className="toggle"
            checked={completed}
            type="checkbox" 
            onChange = {handleChageCheckbox} 
            />
            <label>{title}</label>
            <button 
            className="destroy"
             onClick={() => {
             onRemoveTodo({id})
             }}></button>

        </div>
    )
}