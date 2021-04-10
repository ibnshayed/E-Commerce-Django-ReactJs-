import { Pagination } from "react-bootstrap";
import { useHistory } from "react-router";
import { LinkContainer } from "react-router-bootstrap";



const Paginate = (props) => {

  const { pages, page, keyword } = props;
  const history = useHistory()


  return (
    <>
      {
        pages > 1 && (
          <Pagination>
            {[...Array(pages).keys()].map(x => (
              <LinkContainer key={x + 1}
                to={`${history.location.pathname}?${keyword ? `keyword=${keyword}&` : ''}page=${x+1}`}
                >
                  <Pagination.Item
                    active={x + 1 === Number(page)}
                  >
                    {x + 1}
                  </Pagination.Item>
                </LinkContainer>
            ))}
          </Pagination>
        )
      }
    </>
  )
}

export default Paginate
