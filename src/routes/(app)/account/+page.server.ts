import prisma from '$lib/database';
import type { Actions } from './$types';

export const actions = {
  default: async ({request, locals}) => {
    const data = await request.formData();
    const avatar = data.get('avatar') as string;
    const name = data.get('name') as string;
    // @ts-expect-error - it says id is undefined, but it's not
    const id = (await locals.getSession())?.user?.id;
    const response = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        image: avatar,
        name
      }
    });
    if (!response) return {success:false}

    return {success:true}
  }
} satisfies Actions;