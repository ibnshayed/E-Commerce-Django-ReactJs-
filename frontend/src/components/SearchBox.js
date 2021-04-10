import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { useQuery } from "./utils"

const SearchBox = () => {
  
  const history = useHistory()

  let query = useQuery();

  const [keyword, setKeyword] = useState(query.get('keyword') != null ? query.get('keyword') : '')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword) {
      history.push(`/?keyword=${keyword}`)
    }
    else {
      history.push(history.location.pathname)
    }
  }
  
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name='q'
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        className='mr-sm-2 ml-sm-5'
      >
      </Form.Control>
      <Button
        type="submit"
        variant='outline-success'
        className='p-2'
      >
        Submit
      </Button>
    </Form>
  )
}

export default SearchBox
