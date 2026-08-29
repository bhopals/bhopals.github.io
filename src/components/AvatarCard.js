import { fallbackImage, skeleton } from "../helpers/utils";
import LazyImage from "./LazyImage";
import PropTypes from 'prop-types';
import { useContext } from "react";
import { LoadingContext } from "../contexts/LoadingContext";
import { AiFillGithub } from 'react-icons/ai';
import { GrLinkedinOption } from 'react-icons/gr';
import { MdMail } from 'react-icons/md';
import config from "../config";

const AvatarCard = (props) => {
    const [loading] = useContext(LoadingContext);

    return (
        <div className="card shadow-lg compact bg-base-100">
            <div className="grid place-items-center py-8">
                {
                    (loading || !props.profile) ? (
                        <div className="avatar opacity-90">
                            <div className="mb-8 rounded-full w-32 h-32">
                                {
                                    skeleton({
                                        width: 'w-full',
                                        height: 'h-full',
                                        shape: '',
                                    })
                                }
                            </div>
                        </div>
                    ) : (
                        <div className="avatar opacity-90">
                            <div className="mb-8 rounded-full w-32 h-32 ring ring-primary ring-offset-base-100 ring-offset-2">
                                {
                                    <LazyImage
                                        src={props.profile.avatar ? props.profile.avatar : fallbackImage}
                                        alt={props.profile.name}
                                        placeholder={
                                            skeleton({
                                                width: 'w-full',
                                                height: 'h-full',
                                                shape: '',
                                            })
                                        }
                                    />
                                }
                            </div>
                        </div>
                    )
                }
                <div className="text-center mx-auto px-8">
                    <h5 className="font-bold text-2xl">
                        {
                            (loading || !props.profile) ? (
                                skeleton({ width: 'w-48', height: 'h-8' })
                            ) : <span className="opacity-70">{props.profile.name}</span>
                        }
                    </h5>
                    {
                        (loading || !props.profile) ? (
                            <div className="mt-3">
                                {skeleton({ width: 'w-48', height: 'h-5' })}
                            </div>
                        ) : (
                            <>
                                {config.hero?.headline && (
                                    <div className="mt-3 font-semibold text-primary opacity-90">
                                        {config.hero.headline}
                                    </div>
                                )}
                                {config.hero?.tagline && (
                                    <div className="mt-1 text-sm text-base-content text-opacity-60">
                                        {config.hero.tagline}
                                    </div>
                                )}
                                <div className="mt-5 flex justify-center flex-wrap gap-2">
                                    <a
                                        href={`https://github.com/${config.github.username}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-primary btn-sm gap-1 normal-case"
                                    >
                                        <AiFillGithub className="text-lg" />
                                        GitHub
                                    </a>
                                    {config.social?.linkedin && (
                                        <a
                                            href={`https://www.linkedin.com/in/${config.social.linkedin}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn btn-outline btn-sm gap-1 normal-case"
                                        >
                                            <GrLinkedinOption className="text-lg" />
                                            LinkedIn
                                        </a>
                                    )}
                                    {config.social?.email && (
                                        <a
                                            href={`mailto:${config.social.email}`}
                                            className="btn btn-outline btn-sm gap-1 normal-case"
                                        >
                                            <MdMail className="text-lg" />
                                            Email
                                        </a>
                                    )}
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

AvatarCard.propTypes = {
    profile: PropTypes.object
}

export default AvatarCard;