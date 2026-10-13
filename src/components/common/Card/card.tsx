import { Card as MCard } from "@mui/material";
import { Fragment, JSX, ReactNode } from "react";
import { FlatPaper, FluidPaper, RoundedPaper } from "../Paper/paper.styles";
import { StaticImageProps } from "../StaticImage/staticImage";
import { CardContent, CardSection } from "./card.styles";
import {
  CardAction,
  CardActionProps,
} from "./components/CardAction/cardAction";
import { CardActionArea as ActionArea } from "./components/CardActionArea/cardActionArea";
import { CardActions } from "./components/CardActions/cardActions";
import { CardMedia } from "./components/CardMedia/cardMedia";
import { CardSecondaryText } from "./components/CardSecondaryText/cardSecondaryText";
import { CardSecondaryTitle } from "./components/CardSecondaryTitle/cardSecondaryTitle";
import { CardText } from "./components/CardText/cardText";
import { CardTitle } from "./components/CardTitle/cardTitle";

/**
 * Props for the Card component.
 */
export interface CardProps {
  cardActions?: CardActionProps[];
  cardUrl?: string;
  media?: StaticImageProps;
  Paper?: typeof FlatPaper | typeof FluidPaper | typeof RoundedPaper;
  secondaryText?: ReactNode; // e.g. Date.
  secondaryTitle?: ReactNode;
  text?: ReactNode;
  title?: ReactNode;
}

/**
 * Card, rendering the given title, text, media and actions; the card is clickable when a card url is given.
 * @param props - Component props.
 * @param props.cardActions - Actions rendered at the bottom of the card.
 * @param props.cardUrl - Url the card navigates to when clicked.
 * @param props.media - Image rendered in the card.
 * @param props.Paper - Paper component the card renders as; defaults to RoundedPaper.
 * @param props.secondaryText - Secondary text, e.g. a date.
 * @param props.secondaryTitle - Secondary title.
 * @param props.text - Card text.
 * @param props.title - Card title.
 * @returns The card.
 */
export const Card = ({
  cardActions,
  cardUrl,
  media,
  Paper = RoundedPaper,
  secondaryText,
  secondaryTitle,
  text,
  title,
}: CardProps): JSX.Element => {
  const CardActionArea = cardUrl ? ActionArea : Fragment;
  const cardActionAreaProps = cardUrl ? { cardUrl } : {};
  return (
    <MCard component={Paper}>
      <CardActionArea {...cardActionAreaProps}>
        <CardSection>
          <CardContent>
            {title && <CardTitle>{title}</CardTitle>}
            {secondaryTitle && (
              <CardSecondaryTitle>{secondaryTitle}</CardSecondaryTitle>
            )}
            {text && <CardText>{text}</CardText>}
            {secondaryText && (
              <CardSecondaryText>{secondaryText}</CardSecondaryText>
            )}
          </CardContent>
          {media?.src && <CardMedia media={media} />}
          {cardActions && cardActions.length > 0 && (
            <CardActions>
              {cardActions.map((cardAction, i) => (
                <CardAction key={`${cardAction.label}${i}`} {...cardAction} />
              ))}
            </CardActions>
          )}
        </CardSection>
      </CardActionArea>
    </MCard>
  );
};
