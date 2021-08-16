export async function viewModelTransformTest(viewModel) {
  return {
    ...viewModel,
    test: 'test2'
  };
}
