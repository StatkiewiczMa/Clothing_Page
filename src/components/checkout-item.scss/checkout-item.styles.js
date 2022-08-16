import styled from "styled-components";

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`;
export const RemoveButton = styled.div`
  // font-size: 1rem;
  padding-left: 12px;
  cursor: pointer;
`;

export const Image = styled("img")`
  width: 23%;
  padding-right: 15px;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const Span = styled.div`
  width: 23%;
`;
export const Quantity = styled(Span)`
  display: flex;
`;

export const Arrow = styled.div`
  cursor: pointer;
`;

export const Value = styled.div`
  margin: 0 10px;
`;
