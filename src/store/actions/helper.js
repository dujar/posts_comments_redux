export const IS_LOADING = 'IS_LOADING'
export const HAS_ERRORED = 'HAS_ERRORED'


export const isLoading = (bool)=>{
  return{
    type: IS_LOADING,
    bool
  }
}

export const hasErrored = (bool) => {
  return {
    type: HAS_ERRORED,
    bool
  }
}