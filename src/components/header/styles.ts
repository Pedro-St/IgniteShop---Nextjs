import { styled } from '../../styles'

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'space-between',
  justifyContent: 'space-between',
  cursor: 'pointer',
})

export const CartButton = styled('button', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '12px',
  gap: '12px',
  cursor: 'pointer',
  width: 48,
  height: 48,

  border: 'none',
  backgroundColor: '$gray800',
  borderRadius: '6px',
  color: '$gray100',

  '&:hover': {
   color: '$green300'
  }
})
