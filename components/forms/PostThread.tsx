"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'

import { usePathname, useRouter } from "next/navigation"
import { threadValidation } from "@/lib/validations/thread"
import { createThread } from "@/lib/actions/thread.actions"


interface Props {
    user: {
        id: string
        objectId: string
        username: string
        name: string
        bio: string
        image: string
    },
    btnTitle: string
}
    

function PostThread({ userId }: { userId: string}) {
    const router = useRouter()
    const pathname = usePathname()

    const form = useForm({
        resolver: zodResolver(threadValidation),
        defaultValues: {
            thread: '',
            accountId: userId,
        }
    })


    const onSubmit = async (values: z.infer<typeof threadValidation>) => {
        await createThread({
            text: values.thread,
            author: userId,
            communityId: null,
            path: pathname
        })

        router.push('/')
    }

    return (
        <>
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)} 
                    className="mt-10 flex flex-col justify-start gab-10"
                >
                    <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full gab-3 ">
                            <FormLabel className="text-base-semibold text-light-2">
                                Content
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    rows={15}
                                    className="account-form_input no-focus"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            
                        </FormItem>
                    )}
                    />  
                    <Button type="submit" className="bg-primary-500">Post Thread</Button>
                </form>
            </Form>
        </>
    )
} 

export default PostThread