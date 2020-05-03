import Link from "next/link";
import { useRouter, withRouter } from "next/router";
import styled from "styled-components";
import { GlobalConfiguration } from "../../utils/global";

export const withPageRouter = (Component) => {

  return withRouter(({ router, ...props }) => {
  
    router.query = [
      ...new URLSearchParams((router.asPath || "").split(/\?/)[1]).entries(),
    ].reduce((q, [k, v]) => Object.assign(q, { [k]: v }), {});

    return <Component {...props} router={router} />;
  });
};

const Pagination = ({ numberProducts }) => {
  const router = useRouter();
  let {
    query: { page },
  } = router;

  page = page == undefined ? 1 : parseInt(page);
  console.log(router);

  let baseUrl = router.asPath.replace(`page=${page}`, "");
  baseUrl += baseUrl.indexOf("?") > 0 ? "" : "?";
  const nextUrl = baseUrl + "page=" + (page + 1);
  const prevUrl = baseUrl + "page=" + (page - 1);
  return (
    <StyledPagination>
      <nav aria-label="Page navigation">
        <ul className="pagination mb-0">
          {page > 1 ? (
            <li className="page-item ml-0">
              <Link href={router.route} as={prevUrl}>
                <a className="page-link previous" aria-label="Previous">
                  <span aria-hidden="true">« Previous</span>
                </a>
              </Link>
            </li>
          ) : null}

          {numberProducts == GlobalConfiguration.ProductListing.PerPage + 1 ? (
            <li className="page-item">
              <Link href={router.route} as={nextUrl}>
                <a className="page-link next" aria-label="Next">
                  <span aria-hidden="true">Next »</span>
                </a>
              </Link>
            </li>
          ) : null}
        </ul>
      </nav>
    </StyledPagination>
  );
};

const StyledPagination = styled.div`
  text-align: center;
`;
export default withPageRouter(Pagination);
