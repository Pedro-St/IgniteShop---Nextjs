import { styled } from "..";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',


})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'space-between',
  justifyContent: 'space-between',
  cursor: 'pointer',

});

export const CartHeader = styled('button', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: 12,
  gap: 12,

  border: 'none',
  borderRadius: 6,
  color: 'white',
  backgroundColor: '$gray800',

  cursor: 'pointer',

})

export const NumberItems = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    gap: 8,

    position: 'absolute',
    width:24,
    height: 24,

    marginTop: '-3rem',
    marginLeft: '2rem',
    backgroundColor: '$green500',
    borderRadius: 1000,

    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    
    
})